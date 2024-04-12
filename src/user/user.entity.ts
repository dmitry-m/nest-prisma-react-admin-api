import { Entity, Column } from "typeorm";

import { BaseEntity } from "../entities/baseEntity.entity";

@Entity("User")
export class User extends BaseEntity {
  @Column({ length: 255, unique: true })
  public email: string;

  @Column({ length: 255, select: false })
  public password: string;

  @Column({ length: 255 })
  public name?: string;

  @Column({ length: 255 })
  public role: string;

  @Column("boolean", { default: false, name: "is_admin" })
  public is_admin: boolean;
}
