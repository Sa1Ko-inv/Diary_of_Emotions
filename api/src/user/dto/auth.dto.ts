import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    description: 'JWT access token for authenticated user',
    example: 'eyJhbGciOiJIUzI1NiIs...',
  })
  accessToken: string;
}
