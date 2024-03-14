import { Users as _Users } from "./users";
import { Customers as _Customers } from "./customers";
import { Categories as _Categories } from "./categories";
import { Products as _Products } from "./products";
import { Commands as _Commands } from "./commands";
import { Invoices as _Invoices } from "./invoices";
import { Reviews as _Reviews } from "./reviews";

export namespace PrismaModel {
  export class Users extends _Users {}
  export class Customers extends _Customers {}
  export class Categories extends _Categories {}
  export class Products extends _Products {}
  export class Commands extends _Commands {}
  export class Invoices extends _Invoices {}
  export class Reviews extends _Reviews {}

  export const extraModels = [Users, Customers, Categories, Products, Commands, Invoices, Reviews];
}
