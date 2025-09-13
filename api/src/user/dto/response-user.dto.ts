// user.dto.ts
import { Expose, Transform } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  password: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  @Transform(({ value }) => {
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  })
  createdAt: string;

  // @Expose()
  // @Transform(({ value }) => {
  //   const date = new Date(value);
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // })
  // updatedAt: string;
}
