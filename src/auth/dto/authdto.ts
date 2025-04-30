import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class AdminDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}


export class AuthAdminDTO {
    @IsString({ message: "Email is required" })
    email!: string;

    @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }, { message: "Password should be a minimum of 8 characters, with at least 1 uppercase, 1 lowercase, 1 number and 1 special character" })
    password!: string;
}

// export class LoginUserResponseDTO {
//     @IsString()
//     isSuccess!: boolean;

//     user?: IUser|null;

//     @IsString()
//     token?: string|undefined|null;

//     @IsString()
//     message?: string
// }


