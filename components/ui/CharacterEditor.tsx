import {useCallback, useEffect, useState} from "react";
import {Tabs, TabsTrigger, TabsContent, TabsList} from "@/components/ui/tabs";
import {MaleIcon} from "@/components/icons/MaleIcon";
import {FemaleIcon} from "@/components/icons/FemaleIcon";
import Image from "next/image";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {CharacterDisplay} from "@/components/ui/CharacterDisplay";
import {ClassList, classList} from "@/src/lib/classes";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Loader} from "@/components/ui/Loader";
import {
    Credenza, CredenzaBody, CredenzaClose,
    CredenzaContent,
    CredenzaDescription, CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger
} from "@/components/ui/credenza";

type CharacterEditorProps = {
    id?: number;
}

export const CharacterEditor = (props: CharacterEditorProps) => {
    const router = useRouter();
    const [pseudo, setPseudo] = useState<string>("");
    const [selectedClass, setSelectedClass] = useState<ClassList>(classList[0]);
    const [gender, setGender] = useState<'m' | 'f'>("m");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.id === "new") return;
        const fetchCharacter = async () => {
            await fetch(`/api/character/${props.id}`).then(async (res) => {
                const data = await res.json();
                setPseudo(data.pseudo);
                setSelectedClass(data.classe.slug);
                setGender(data.gender)
                setLoading(false)
            }).catch(() => {
                router.push("/characters");
            });
        };
        if (props.id) {
            setLoading(true);
            fetchCharacter().then(() => {
                setLoading(false);
            })
        }
    }, [props.id]);


    const saveCharacter = useCallback(async (e: React.SyntheticEvent) => {
        setLoading(true);
        e.preventDefault();
        try {
            const body = {pseudo, classeName: selectedClass, gender};
            if (props.id === "new") {
                await fetch('/api/character/create', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(body),
                });
            } else {
                await fetch(`/api/character/${props.id}`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(body),
                })
            }
            router.push("/characters");
        } catch (error) {
            setLoading(false);
        }
    }, [pseudo, selectedClass, gender]);

    const deleteCharacter = useCallback(async (e: React.SyntheticEvent) => {
        setLoading(true);
        e.preventDefault();
        try {
            await fetch(`/api/character/${props.id}`, {
                method: 'DELETE',
            });
            router.push("/characters");
        } catch (error) {
            setLoading(false);
        }
    }, [props.id, router]);


    if (props?.id !== "new" && !pseudo) {
        return <Loader size={56}/>
    }

    return <div className={"flex flex-col size-fit gap-16"}>

        <div className={" flex flex-col gap-2"}>
            <Input
                placeholder={"Pseudo"}
                type={"text"}
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
            />
            <Select onValueChange={setSelectedClass} value={selectedClass} defaultValue={"cra"}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Classe"/>
                </SelectTrigger>
                <SelectContent>
                    {classList.map((c, i) => (
                        <SelectItem key={i} value={c}>
                            <span className={"inline-flex gap-2 items-center capitalize "}>
                            <Image
                                src={`/images/classes/logo/${c}.png`} alt={c}
                                width={36}
                                height={36}
                            />
                                {c}
                        </span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        <Tabs defaultValue={"m"} value={gender} className="size-fit flex flex-col items-center justify-center"
              onValueChange={(e: "m" | "f") => setGender(e)}>
            <TabsList className="flex w-fit justify-center">
                <TabsTrigger value="m"><MaleIcon className="size-8 stroke-blue-500"/></TabsTrigger>
                <TabsTrigger value="f"><FemaleIcon className="size-8 text-pink-500"/></TabsTrigger>
            </TabsList>
            <TabsContent value="m">
                <CharacterDisplay gender={"m"} class={selectedClass}/>
            </TabsContent>
            <TabsContent value="f">
                <CharacterDisplay gender={"f"} class={selectedClass}/>
            </TabsContent>
        </Tabs>
        <div className={"flex flex-col gap-2"}>
            <Button
                onClick={(e) => {
                    if (loading) return;
                    saveCharacter(e)
                }}
                disabled={loading}
            >
                {loading ?
                    <Loader size={24}/>
                    :
                    props?.id === "new" ?
                        <span>Créer le personnage</span>
                        :
                        <span>Modifier le personnage</span>
                }
            </Button>
            {props?.id !== "new" &&
                <Credenza>
                    <CredenzaTrigger asChild>
                        <Button
                            variant="destructive"
                            disabled={loading}
                        >
                            {loading ?
                                <Loader size={24}/>
                                :
                                <span>Supprimer le personnage</span>
                            }
                        </Button>
                    </CredenzaTrigger>
                    <CredenzaContent>
                        <CredenzaHeader>
                            <CredenzaTitle>Êtes-vous sûr de vouloir supprimer "{pseudo}" ?</CredenzaTitle>
                        </CredenzaHeader>
                        <CredenzaBody>
                            Cette action est irréversible et entraînera la suppression définitive de ce personnage ainsi que de tous les echanges associés.
                        </CredenzaBody>
                        <CredenzaFooter>
                            <CredenzaClose asChild>
                                <Button variant="outline">
                                    Fermer
                                </Button>
                            </CredenzaClose>
                            <CredenzaClose asChild>
                                <Button
                                    variant="destructive"
                                    onClick={(e)=>{
                                        if(loading)
                                            return
                                        e.preventDefault();
                                        setLoading(true)
                                        deleteCharacter(e).then(()=>{
                                            e.preventDefault();
                                        }).finally(()=>setLoading(false))
                                    }}
                                    disabled={loading}
                                >
                                    {loading ?
                                        <Loader size={24}/>
                                        :
                                        <span>Supprimer</span>
                                    }
                                </Button>
                            </CredenzaClose>
                        </CredenzaFooter>
                    </CredenzaContent>
                </Credenza>
            }
        </div>
    </div>
};