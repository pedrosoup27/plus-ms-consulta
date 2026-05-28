export class DefaultDto{
    // Dto padrão do projeto (pode ser Request para put/post)
    constructor(id: number, nome: string){
        this.id = id;
        this.nome = nome;
    }

    id: number;
    nome: string;
}