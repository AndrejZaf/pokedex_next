import BackButton from "@/components/back-button";
import PokemonKeyCharacteristics from "@/components/pokemon/pokemon-key-characteristics";
import { PokemonMoves } from "@/components/pokemon/pokemon-moves";
import PokemonStats from "@/components/pokemon/pokemon-stats";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExtendedPokemon, Pokemon } from "@/types";
import { determinePokemonColor, pokemonColor } from "@/utils/pokemon-color.util";
import { Metadata } from "next";

export async function generateMetadata(
    { params }: { params: Promise<{ id: string }> },
): Promise<Metadata> {
    const id = (await params).id;
    const pokemon = await getPokemon(id);
    const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    return {
        title: pokemonName,
    };
}

const getPokemon = async (id: string): Promise<Pokemon> => {
    const baseData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await baseData.json();
};

const PokemonPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const basePokemon = await getPokemon(id);
    const pokeColor = pokemonColor[basePokemon.name];
    const pokemonColors = determinePokemonColor(pokeColor);
    const extendedData = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const extendedPokemon: ExtendedPokemon = await extendedData.json();
    return (
        <>
            <div className="w-full px-4 md:px-12 pt-4" style={{ backgroundColor: pokemonColors.background }}>
                <div className="flex flex-col space-y-4">
                    <div>
                        <BackButton color={pokemonColors.badgeTextColor} />
                    </div>
                    <div className="capitalize font-semibold text-3xl"
                         style={{ color: pokemonColors.badgeTextColor }}>{basePokemon.name}</div>
                    <div className="flex space-x-4">{basePokemon.types.map(type =>
                        <Badge className="capitalize text-lg" key={type.type.name} style={{
                            backgroundColor: pokemonColors.badge,
                            color: pokemonColors.badgeTextColor,
                        }}>{type.type.name}</Badge>)}</div>
                    <div className="pokemon-image">
                        <img className="w-60 justify-self-center"
                             src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                             alt={basePokemon.name} />
                    </div>
                </div>
            </div>
            <div className="bg-inherit w-full rounded-t-3xl mt-[-50px] px-4 flex justify-center">
                <Tabs defaultValue="about" className="mt-12">
                    <TabsList className="w-full md:space-x-44 lg:space-x-72">
                        <TabsTrigger tabColor={pokemonColors.background} value="about">About</TabsTrigger>
                        <TabsTrigger tabColor={pokemonColors.background} value="base-stats">Base Stats</TabsTrigger>
                        <TabsTrigger tabColor={pokemonColors.background} value="moves">Moves</TabsTrigger>
                    </TabsList>
                    <div className="w-full">
                        <TabsContent className="my-4" value="about">
                            <PokemonKeyCharacteristics basePokemon={basePokemon} extendedPokemon={extendedPokemon} />
                        </TabsContent>
                        <TabsContent className="my-4" value="base-stats"><PokemonStats
                            pokemon={basePokemon} /></TabsContent>
                        <TabsContent className="my-4" value="moves"><PokemonMoves pokemon={basePokemon} /></TabsContent>
                    </div>
                </Tabs>
            </div>
        </>
    );
};

export default PokemonPage;
