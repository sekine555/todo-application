import { IsNotEmpty, IsString } from "class-validator";
import { IsNumericString } from "@/infrastructure/middleware/validators/IsNumericString";

export class TaskIdRequest {
  constructor(id: string) {
    this.id = id;
  }

  @IsNotEmpty()
  @IsString()
  @IsNumericString({ message: "id must be a number" })
  id: string;

  public toNumber(): number {
    return Number(this.id);
  }
}
