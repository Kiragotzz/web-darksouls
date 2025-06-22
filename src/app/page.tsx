"use client";
import Select from "@/components/ui/Select";
import { useState, useEffect } from "react";
import ToolsServices from "@/services/tools.services";

export default function Home() {
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState<{ name: string; id: number, path: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState<any>(null); // Novo estado para os dados do jogo
  const [fetchingGame, setFetchingGame] = useState(false); // Estado para controlar o loading da busca

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const options = await ToolsServices.listOptionsGames();
        setOptions(options);
      } catch (error) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  // Função para lidar com a seleção
  const handleSelection = async (value: string) => {
    setSelectedValue(value);
    setFetchingGame(true);

    try {
      // Busca os dados do jogo usando o ID selecionado
      const gameId = parseInt(value);
      console.log("🚀 ~ gameId:", gameId);
      console.log("🚀 ~ options[gameId]:", options[gameId])
      const gameData = await ToolsServices.dataSelectedGame(options[gameId].path); // Você precisa implementar esta função no serviço
      // const gameData = 'teste'; // Você precisa implementar esta função no serviço
      setGameData(gameData);
    } catch (error) {
      console.error("Erro ao buscar dados do jogo:", error);
      setGameData(null);
    } finally {
      setFetchingGame(false);
    }
  };

  return (
    <section className="container shadow p-6 max-w-4xl mx-auto mt-8 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo à Home</h1>
      <p className="text-gray-600 mb-6">
        Este é o conteúdo principal da página inicial.
      </p>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Carregando opções...</span>
        </div>
      ) : options.length > 0 ? (
        <div className="mb-6">
          <Select
            label="Selecione um jogo"
            options={options.map((opt) => ({ ...opt, id: String(opt.id) }))}
            value={selectedValue}
            onChange={handleSelection} // Alterado para usar a nova função
            placeholder="Escolha uma opção"
          />

          {selectedValue && !fetchingGame && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <p className="font-medium">Jogo selecionado:</p>
              <p className="text-lg">
                {options.find((opt) => String(opt.id) === selectedValue)?.name}
              </p>
            </div>
          )}

          {/* Exibição dos dados do jogo */}
          {fetchingGame && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              <span className="ml-3">Buscando dados do jogo...</span>
            </div>
          )}

          {gameData && !fetchingGame && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h2 className="text-xl font-bold mb-3">Dados do Jogo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gameData.areas.map((area: any) => (
                  <div key={area.id} className="p-3 border rounded-lg">
                    <h3 className="font-semibold">{area.name}</h3>
                    <p className="text-sm text-gray-600">{area.description}</p>
                    <div className="mt-2">
                      <h4 className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        Conexões:
                      </h4>
                      <ul className="list-disc pl-5 text-sm">
                        {area.connections.map((connId: string) => {
                          const connectedArea = gameData.areas.find(
                            (a: any) => a.id === connId
                          );
                          return (
                            <li key={connId}>
                              {connectedArea ? connectedArea.name : connId}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          <p>Nenhuma opção disponível.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md"
          >
            Tentar novamente
          </button>
        </div>
      )}
    </section>
  );
}
