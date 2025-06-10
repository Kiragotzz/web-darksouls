"use client";
import Select from "@/components/ui/Select";
import { useState, useEffect } from "react";

export default function Home() {
  const [selectedValue, setSelectedValue] = useState("");

  const [options, setOptions] = useState<{ name: string; id: number }[]>([]); // Estado para armazenar as opções
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar as opções da API
    const fetchOptions = async () => {
      try {
        const response = await fetch(
          "https://api-darksouls.onrender.com/options"
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar opções");
        }

        const data = await response.json();
        setOptions(data);
        console.log("Opções carregadas:", data);

        // Seleciona o primeiro item por padrão se existirem opções
        // if (data.length > 0) {
        //   setSelectedValue(String(data[0].id));
        // }
      } catch (error) {
        console.error("Erro na requisição:", error);
        // Tratamento de erro (opcional)
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

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
            onChange={setSelectedValue}
            placeholder="Escolha uma opção"
          />

          {selectedValue && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <p className="font-medium">Jogo selecionado:</p>
              <p className="text-lg">
                {options.find((opt) => String(opt.id) === selectedValue)?.name}
              </p>
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
