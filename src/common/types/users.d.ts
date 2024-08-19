export interface AddressGeo {
	lat: string;
	lng: string;
}

export interface UserAddress {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: AddressGeo;
}

export interface Company {
	name: string;
	catchPhrase: string;
	bs: string;
}

export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	address: UserAddress;
	phone: string;
	website: string;
	company: Company;
}
