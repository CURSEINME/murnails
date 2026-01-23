'use server';

import { generateSlug } from '@/lib/generateSlug';
import { prisma } from '@/lib/prisma';
import { CreateServiceFormValues, serviceSchema } from '@/lib/zodSchemes';
import { Service } from '@prisma/client';
import { optimizeImage } from '@/lib/sharp';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { aws, BUCKET, ENDPOINT } from '@/lib/s3Client';
import { revalidatePath } from 'next/cache';

export const createServiceAction = async (data: CreateServiceFormValues) => {
  try {
    const validated = serviceSchema.safeParse(data);

    if (!validated.success) {
      return { success: false, message: 'Invalid data' };
    }

    const { serviceImage, ...newData } = validated.data;
    const slug = generateSlug(data.title);

    let imageUrl = '';

    if (serviceImage instanceof File) {
      const buffer = Buffer.from(await serviceImage.arrayBuffer());
      const optimizedImage = await optimizeImage(buffer);

      const fileName = serviceImage.name.replace(/\.[^/.]+$/, '.webp');

      const command = new PutObjectCommand({
        Bucket: 'murnails',
        Key: fileName,
        Body: optimizedImage,
        ContentType: 'image/webp',
      });

      imageUrl = `${ENDPOINT}/${BUCKET}/${fileName}`;

      await aws.send(command);
    } else if (typeof serviceImage === 'string') {
      imageUrl = serviceImage;
    }

    const newService = await prisma.service.create({
      data: {
        ...newData,
        slug,
        serviceImage: imageUrl,
      },
    });

    revalidatePath('/');

    return {
      success: true,
      message: 'Service created successfully',
      service: newService,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Error creating service' };
  }
};

export const deleteServiceAction = async (data: Service) => {
  try {
    const validated = serviceSchema.safeParse(data);

    if (!validated.success) {
      return { success: false, message: 'Invalid data' };
    }

    const { id, serviceImage } = validated.data;

    await prisma.service.delete({ where: { id } });

    aws.send(
      new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: serviceImage,
      }),
    );

    revalidatePath('/');

    return { success: true, message: 'Service deleted successfully' };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Error deleting service' };
  }
};

export const updateServiceAction = async (data: CreateServiceFormValues) => {
  try {
    const validated = serviceSchema.safeParse(data);

    if (!validated.success) {
      return { success: false, message: 'Invalid data', service: {} };
    }

    const { id, serviceImage, ...newData } = validated.data;

    const existingService = await prisma.service.findUnique({ where: { id } });
    if (!existingService) {
      return { success: false, message: 'Service not found', service: {} };
    }

    let imageUrl = existingService.serviceImage;

    if (serviceImage instanceof File) {
      if (existingService.serviceImage) {
        const oldFileName = existingService.serviceImage.split('/').pop();
        if (oldFileName) {
          const deleteCommand = new DeleteObjectCommand({
            Bucket: BUCKET,
            Key: oldFileName,
          });
          await aws.send(deleteCommand);
        }
      }

      const buffer = Buffer.from(await serviceImage.arrayBuffer());
      const optimizedImage = await optimizeImage(buffer);
      const fileName = serviceImage.name.replace(/\.[^/.]+$/, '.webp');

      const putCommand = new PutObjectCommand({
        Bucket: BUCKET,
        Key: fileName,
        Body: optimizedImage,
        ContentType: 'image/webp',
      });

      await aws.send(putCommand);
      imageUrl = `${ENDPOINT}/${BUCKET}/${fileName}`;
    }

    const newService = await prisma.service.update({
      where: { id },
      data: { ...newData, serviceImage: imageUrl },
    });

    revalidatePath('/');

    return {
      success: true,
      message: 'Service updated successfully',
      service: newService,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Error updating service', service: {} };
  }
};
