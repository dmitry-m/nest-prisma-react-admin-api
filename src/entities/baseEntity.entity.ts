import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  // @CreateDateColumn({ name: "created_at" })
  // public createdAt: Date;

  // @UpdateDateColumn({ select: false, name: "updated_at" })
  // public updatedAt: Date;
}
