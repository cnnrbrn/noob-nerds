import { Box, Flex, Stack, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function ContentSkeleton() {
    return (
        <Stack>
			<Box height="4px" />
			<Flex justifyContent="end">
				<Skeleton height="7px" width="40%" />
			</Flex>
			<Box height="10px" />
			<Skeleton height="20px" width="40%" />
			<Box height="30px" />
			<SkeletonText mt="4" noOfLines={4} spacing="4" />
			<Box height="10px" />
			<Skeleton height="110px" />
			<Box height="20px" />
			<SkeletonText mt="0" noOfLines={3} spacing="4" />
		</Stack>
    );
}