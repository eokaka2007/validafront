import { useState } from "react";

const Dashboard = () => {
  const [documento, setDocumento] = useState("");
  const [tipo, setTipo] = useState<"cnpj" | "cpf">("cnpj");
  const [dtInicial, setDtInicial] = useState("");
  const [dtFinal, setDtFinal] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [exibirRelatorio, setExibirRelatorio] = useState(false);

  // Link do seu Iframe/Relatório
  const URL_POWER_BI = "https://app.powerbi.com/reportEmbed?reportId=44029358-a74c-43ff-b041-0a01877077e3&autoAuth=true&ctid=7b8228c2-911b-4b3d-bca2-bb42add6ec41";

  const aplicarFiltro = async () => {
    setLoading(true);
    setMsg("");
    setExibirRelatorio(false);

    try {
      const response = await fetch("https://valida-proxy.onrender.com/filtro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documento: documento.replace(/\D/g, ""),
          tipo,
          dtinicial: dtInicial,
          dtfinal: dtFinal,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.erro || "Erro ao aplicar filtro");
      }

      setMsg("✅ Filtros aplicados! Os dados estão prontos para o Power BI.");
      setExibirRelatorio(true);
    } catch (err: any) {
      setMsg("❌ Erro: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Segoe UI, sans-serif" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#f4f4f4", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <h2 style={{ marginTop: 0 }}>🛒 Painel de Controle - Mercado Abilhão</h2>
        
        <div style={{ display: "grid", gap: "15px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>CNPJ / CPF</label>
            <input
              style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              placeholder="Ex: 33429648000137"
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Data Inicial</label>
              <input 
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} 
                type="date" 
                value={dtInicial} 
                onChange={(e) => setDtInicial(e.target.value)} 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Data Final</label>
              <input 
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} 
                type="date" 
                value={dtFinal} 
                onChange={(e) => setDtFinal(e.target.value)} 
              />
            </div>
          </div>

          <button 
            onClick={aplicarFiltro} 
            disabled={loading}
            style={{ 
              padding: "12px", 
              backgroundColor: "#107c10", 
              color: "white", 
              border: "none", 
              borderRadius: "4px", 
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {loading ? "Processando..." : "ATUALIZAR DADOS DO BI"}
          </button>
        </div>

        {msg && <p style={{ marginTop: "15px", color: msg.includes("✅") ? "green" : "red", fontWeight: "bold" }}>{msg}</p>}
      </div>

      {/* ÁREA DO RELATÓRIO */}
      {exibirRelatorio && (
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <hr />
          <h3>Relatório Atualizado</h3>
          <iframe 
            title="Mercado Abilhão - Matriz" 
            width="100%" 
            height="600" 
            src={URL_POWER_BI} 
            frameBorder="0" 
            allowFullScreen={true}
            style={{ borderRadius: "8px", border: "1px solid #ddd" }}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
