import { ApiProperty } from "@nestjs/swagger";

export class LoginParameDto {
  @ApiProperty()
  username:string;
  @ApiProperty()
  password:string;
  }