/// <reference types="@sveltejs/kit" />

declare namespace App {
	interface Locals {
		locale: string;
	}

	interface PageData {
		locale: string;
	}

	interface Platform {}
}