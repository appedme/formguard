import { NextResponse } from "next/server";
import { logger } from "./logger";

export class AppError extends Error {
	constructor(
		public message: string,
		public statusCode: number = 500,
		public code?: string
	) {
		super(message);
		this.name = "AppError";
	}
}

export function handleError(error: unknown) {
	if (error instanceof AppError) {
		logger.warn(`AppError: ${error.message}`, { statusCode: error.statusCode, code: error.code });
		return NextResponse.json(
			{ error: error.message, code: error.code },
			{ status: error.statusCode }
		);
	}

	logger.error("Unhandled Error", { error });
	return NextResponse.json(
		{ error: "An unexpected error occurred" },
		{ status: 500 }
	);
}
