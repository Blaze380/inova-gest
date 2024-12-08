// Enum Types
export type GenderType = 'Masculino' | 'Feminino';
export type MaritalStatusType = 'Solteiro(a)' | 'Casado(a)' | 'Divorciado(a)' | 'Viúvo(a)' | 'Noivo(a)' ;
export type StatusType = 'Ativo' | 'Inativo';
export type PaymentStatusType = 'Completado' | 'Pendente' | 'Cancelado';
export type ConservationStatusType = 'Novo' | 'Excelente' | 'Bom' | 'Mau' | 'Nao_Construido';
export type PropertyPurposeType = 'Compra' | 'Aluguer';
export type PropertyStatusType = 'Vendido' | 'Alugado' | 'Disponivel' | 'Indisponivel';

// Tables
export interface Province {
  id: string;
  provinceName: string;
}

export interface City {
  id: string;
  cityName: string;
  provinceId: string;
}

export interface PostalCode {
  id: string;
  postalCode: number;
  provinceId: string;
}

export interface Neighborhood {
  id: string;
  neighborhoodName: string;
  provinceId: string;
}

export interface Street {
  id: string;
  streetName: string;
  provinceId: string;
}

export interface Address {
  id: string;
  propertyNumber?: string;
  streetId?: string;
  neighborhoodId: string;
  provinceId: string;
  cityId: string;
  postalCodeId?: string;
  createdAt: Date;
  modifiedAt?: Date;
  deletedAt?: Date;
}

export interface UserType {
  id: string;
  type: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userTypeId: string;
  gender: GenderType;
  personalEmail: string;
  phoneNumber: string;
  addressId: string;
  biNumber: string;
  birthday: Date;
  maritalStatus: MaritalStatusType;
  userStatus: StatusType;
  createdAt: Date;
  modifiedAt?: Date;
  deletedAt?: Date;
}

export interface ContractType {
  id: string;
  name: string;
}

export interface Contract {
  id: string;
  startDate: Date;
  endDate: Date;
  value: number;
  contractTypeId: string;
  externalClientUserId?: string;
  responsibleEmployeeId: string;
  createdAt: Date;
  modifiedAt?: Date;
  deletedAt?: Date;
}

export interface Role {
  id: string;
  roleName: string;
}

export interface Permission {
  id: string;
  permission: string;
  description?: string;
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
}

export interface Department {
  id: string;
  departmentName: string;
  managerId?: string;
  description?: string;
  departmentStatus: StatusType;
  createdAt: Date;
  modifiedAt?: Date;
  deletedAt?: Date;
}

export interface Employee {
  id: string;
  userId: string;
  username: string;
  password: string;
  roleId: string;
  departmentId: string;
  salary: number;
  supervisorId?: string;
  admissionDate?: Date;
  demissionDate?: Date;
  employeeStatus: StatusType;
  createdAt: Date;
  modifiedAt?: Date;
  deletedAt?: Date;
}

export interface PaymentMethod {
  id: string;
  paymentMethod: string;
}

export interface PaymentType {
  id: string;
  paymentType: string;
}

export interface PaymentClass {
  id: string;
  paymentClass: string;
}

export interface Payment {
  id: string;
  paymentDate: Date;
  contractId: string;
  userId: string;
  paymentTypeId: string;
  paymentMethodId: string;
  paymentClassId: string;
  valuePaid: number;
  paymentStatus: PaymentStatusType;
  createdAt: Date;
  modifiedAt?: Date;
  deletedAt?: Date;
}

export interface Client {
  id: string;
  userId: string;
  createdAt: Date;
  modifiedAt?: Date;
  deletedAt?: Date;
}

export interface PropertyType {
  id: string;
  propertyType: string;
}

export interface Compartment {
  id: string;
  compartmentName: string;
  propertyTypeId: string;
}

export interface Property {
  id: string;
  propertyName?: string;
  propertyTypeId?: string;
  plotAreaM2: number;
  addressId: string;
  propertyOwnerId: string;
  buildYear?: Date;
  conservationStatus: ConservationStatusType;
  propertyPrice: number;
  propertyPurpose: PropertyPurposeType;
  propertyStatus: PropertyStatusType;
  propertyDescription?: string;
  createdAt: Date;
  modifiedAt?: Date;
  deletedAt?: Date;
}

export interface PropertyCompartment {
  id: string;
  compartmentId: string;
  numberOfCompartments: number;
  propertyId: string;
  createdAt: Date;
  modifiedAt?: Date;
  deletedAt?: Date;
}

export interface PropertyImage {
  id: string;
  imageLink: string;
  propertyId: string;
  createdAt: Date;
  modifiedAt?: Date;
  deletedAt?: Date;
}
