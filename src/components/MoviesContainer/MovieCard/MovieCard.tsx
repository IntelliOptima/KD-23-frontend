import { Image, Box, Text, Flex, Spacer } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState, useEffect } from "react";

type Actor = {
    id: number;
    name: string;
};

export type Movie = {
    title?: string;
    poster?: string;
    actors?: Actor[];
    runtime: number; // in minutes
    voteRating?: number;
    description?: string;
};


interface MovieCardProps {
    movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    const { title, poster, actors, runtime, voteRating, description } = movie;

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    const truncatedDescription = description.length > 75 ? description.slice(0, 75) + "..." : description;

    return (
        <Box maxW="xs" maxWidth={300} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" transition="0.3s" 
        style={{margin: '3px'}}        
        _hover={{ transform: 'scale(1.02)'}}
        >
            <Image src={poster} alt={title} width="100%" maxHeight="700px" objectFit="cover" />

            <Box p="3">
                <Box className="flex" alignItems="baseline">
                    <Box
                        color="gray.500"
                        fontWeight="bold"
                        fontSize="xs"
                        textTransform="uppercase"
                    >
                        {actors.map(actor => actor.name).join(', ')}
                    </Box>
                </Box>

                <Text fontSize="xs" mt="1" noOfLines={2}>
                    {truncatedDescription}
                </Text>

                <Flex mt="1">
                    <Box as="span" color="gray.600" fontSize="xs">
                        ⭐ {voteRating}
                    </Box>
                    <Spacer />
                    <Box as="span" color="gray.600" fontSize="xs">
                        {hours}h {minutes}m
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
}

export default MovieCard;


