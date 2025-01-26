import BackButton from "@/components/back-button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pokemon } from "@/types";
import { determinePokemonColor } from "@/utils/color.util";
import { pokemonColor } from "@/utils/pokemon-color.util";

const PokemonPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonData: Pokemon = await data.json();
    const color = pokemonColor[pokemonData.name];
    const colorValues = determinePokemonColor(color);
    return (
        <>
            <div className="w-full px-12 pt-4 mt-4" style={{ backgroundColor: colorValues.background }}>
                <div className="flex flex-col space-y-4">
                    <div>
                        <BackButton />
                    </div>
                    <div className="capitalize font-semibold text-3xl"
                         style={{ color: colorValues.badgeTextColor }}>{pokemonData.name}</div>
                    <div className="flex space-x-4">{pokemonData.types.map(type =>
                        <Badge className="capitalize text-lg" key={type.type.name} style={{
                            backgroundColor: colorValues.badge,
                            color: colorValues.badgeTextColor,
                        }}>{type.type.name}</Badge>)}</div>
                    <div className="pokemon-image">
                        <img className="w-60 justify-self-center"
                             src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                             alt={pokemonData.name} />
                    </div>
                </div>
            </div>
            <div className="bg-white w-full h-72 rounded-t-3xl mt-[-40px] flex justify-center">
                <Tabs defaultValue="about" className="mt-12">
                    <TabsList className="space-x-72">
                        <TabsTrigger tabColor={colorValues.background} value="about">About</TabsTrigger>
                        <TabsTrigger tabColor={colorValues.background} value="base-stats">Base Stats</TabsTrigger>
                        <TabsTrigger tabColor={colorValues.background} value="moves">Moves</TabsTrigger>
                    </TabsList>
                    <TabsContent value="about">
                        <>
                            <div className="text-xl font-semibold">Key Characteristics</div>
                            <div className="flex">
                                <div className="habitat flex gap-x-10">
                                    <div className="label text-lg">Habitat</div>
                                    <div className="value text-lg">Grassland</div>
                                </div>
                            </div>
                        </>
                    </TabsContent>
                    <TabsContent value="base-stats">Base Stats</TabsContent>
                    <TabsContent value="moves">Moves</TabsContent>
                </Tabs>
            </div>
        </>
    );
};
export default PokemonPage;
