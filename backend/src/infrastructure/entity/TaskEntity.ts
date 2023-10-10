import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { GenreEntity } from "./GenreEntity";

@Entity("tasks")
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "genre_id" })
  genreId: number;

  @Column({ length: 100, name: "name" })
  name: string;

  @Column({ type: "int", default: 0, name: "status" })
  status: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => GenreEntity, (genre) => genre.tasks, { eager: true })
  @JoinColumn({ name: "genre_id" })
  genre: GenreEntity;
}
