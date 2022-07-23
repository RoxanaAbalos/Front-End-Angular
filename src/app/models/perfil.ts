import { Education } from "./education";
import { Project } from "./project";
import { Skill } from "./skill";
import { Worked } from "./worked";

export class Perfil {
    id: number;
    dni: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    foto: string;
    acerca: string;
    banner: string;
    ciudad: string;
    titulo: string;
    workeds: Worked[] = [];
    educations: Education[] = [];
    skills: Skill[] = [];
    projects: Project[] = [];

}
