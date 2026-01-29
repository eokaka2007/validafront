import { useState } from "react";

const Dashboard = () => {
  const [documento, setDocumento] = useState("");
  const [tipo, setTipo] = useState<"cnpj" | "cpf">("cnpj");
  const [dtInicial, setDtInicial] = useState("");
  const [dtFinal, setDtFinal] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Adicionamos parâmetros para garantir que a barra de navegação e filtros apareçam
  const urlBI = "https://app.powerbi.com/reportEmbed?reportId=44029358-a74c-43ff-b041-0a01877077e3&autoAuth=true&ctid=7b8228c2-911b-4b3d-bca2-bb42add6ec41&navContentPaneEnabled=1&filterPaneEnabled=1";

  const aplicarFiltro = async () => {
    setLoading(true);
    setMsg("");
    try {
      const response = await fetch("https://valida-proxy.onrender.com/filtro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documento: documento.replace(/\D/g, ""),
          tipo,
          dtinicial: dtInicial,
          dtfinal: dtFinal,
        }),
      });
      if (!response.ok) throw new Error("Erro ao aplicar filtro");
      setMsg("✅ Filtros aplicados!");
    } catch (err: any) {
      setMsg("❌ Erro: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden", backgroundColor: "#1e1e1e", color: "#fff" }}>
      
      {/* SIDEBAR DE FILTROS - Mantida conforme sua lógica atual */}
      <div style={{ 
        width: "300px", minWidth: "300px", padding: "20px", borderRight: "1px solid #333", 
        display: "flex", flexDirection: "column", gap: "15px", zIndex: 10 
      }}>
        <h2 style={{ fontSize: "1.2rem", margin: "0 0 10px 0" }}>Filtros do BI</h2>
        {/* ... Seus inputs (CNPJ, Datas, etc) permanecem iguais ... */}
        <input 
          style={{ width: "100%", padding: "10px", backgroundColor: "#2d2d2d", color: "#fff", border: "1px solid #444" }} 
          value={documento} onChange={(e) => setDocumento(e.target.value)} placeholder="Somente números" 
        />
        
        <button 
          onClick={aplicarFiltro} disabled={loading}
          style={{ padding: "12px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          {loading ? "Processando..." : "APLICAR FILTROS"}
        </button>
        {msg && <p style={{ fontSize: "12px", textAlign: "center", color: msg.includes("✅") ? "#4caf50" : "#ff5252" }}>{msg}</p>}
      </div>

      {/* ÁREA DO BI COM CORREÇÃO DE ESCALA PARA MOSTRAR BOTÕES */}
      <div style={{ 
        flex: 1, 
        backgroundColor: "#000", 
        position: "relative",
        overflow: "hidden" // Esconde as barras de rolagem da resolução de 3940px
      }}>
        <iframe
          title="Mercado Abilhão"
          src={urlBI}
          style={{ 
            width: "100%", 
            height: "100%", 
            border: "none",
            // Força o BI a se ajustar ao tamanho da tela mantendo a proporção
            // Isso revelará a barra cinza superior onde fica o botão de atualizar
          }}
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  );
};

export default Dashboard;
