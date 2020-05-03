const filtro = require('../src/filtro-aula')
const data = require('../data/data.json')

describe('Filtro', () => {
    describe('Status', () => {
        it('Retorna apenas os personagens vivos', () => {
            const response = filtro.filterByStatus(data.results, 'Alive');
            expect(response.length).toBe(8);
        });
        it('Retorna apenas os personagens mortos', () => {
            const response = filtro.filterByStatus(data.results, 'Dead');
            expect(response.length).toBe(6);
        });
        it('Retorna apenas os personagens desconhecidos', () => {
            const response = filtro.filterByStatus(data.results, 'unknown');
            expect(response.length).toBe(6);
        });
    });
    
    describe('Gênero', () => {
        it('Retorna apenas os personagens do sexo masculino', () => {
            const response = filtro.filterByGender(data.results, 'Male');
            expect(response.length).toBe(15);
        });
        it('Retorna apenas os personagens do sexo feminino', () => {
            const response = filtro.filterByGender(data.results, 'Female');
            expect(response.length).toBe(4);
        });
    });

    describe('Episódios', () => {
        it('Retorna episodio 6 da url', () => {
            const url = "https://rickandmortyapi.com/api/episode/5";
            expect(filtro.getEpisodeFromURL(url)).toBe("5");
        });
        it('Retona um array de números dos episódios', () => {
            const personagem = data.results[6];
            expect(personagem.name).toBe("Abradolf Lincler");
            expect(filtro.generateEpisodeList(personagem)).toEqual(["10", "11"])
        });
        it("Retorna um array de numeros dos episodios", () => {
            const personagem = data.results[6];
            const ricky = data.results[0];
            const episodes = {
              "10": [ricky],
              "11": [ricky]
            };
            const response = filtro.mapCharacterToEpisodes(episodes, personagem);
            expect(response["10"].length).toBe(2);
            expect(response["10"][1].name).toBe(personagem.name);
        });

        it("Retorna somente Rick e Morty para o episodio 1", () => {
            const response = filtro.filterByEpisode(data.results, "1");
            expect(response.length).toBe(2);
            expect(response[1].name).toBe("Morty Smith");
        });
    });
    
})