import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { TaskEntity } from "./TaskEntity";

@Entity("genres")
export class GenreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, name: "name" })
  name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => TaskEntity, (task) => task.genre)
  tasks: TaskEntity[];
}
