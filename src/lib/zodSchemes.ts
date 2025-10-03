import z from "zod";

export type CreateServiceFormValues = z.infer<typeof serviceSchema>;

export const serviceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Введите название"),
  description: z.string().min(5, "Введите описание"),
  price: z.string().min(1, "Введите цену"),
  time: z.string().min(1, "Введите время"),
  serviceImage: z
    .any()
    .refine(
      (file) => file instanceof File || typeof file === "string",
      "Выберите изображение"
    ),
});
