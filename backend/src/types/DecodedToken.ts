import { JwtPayload } from "jsonwebtoken";

export interface DecodedToken extends JwtPayload {
	email: string;
}
