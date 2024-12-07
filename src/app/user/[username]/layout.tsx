import type { Metadata } from 'next';

type Params = {
	params: { username: string };
};

const getMetadata = ({ params }: Params): Metadata => ({
	title: `${params.username}'s profile`,
	description: `This is ${params.username}'s profile page.`,
});

export const metadata: Metadata = getMetadata({ params: { username: '' } });

export default function UserLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
