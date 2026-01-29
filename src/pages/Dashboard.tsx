import { useState } from "react";

const Dashboard = () => {
  const [documento, setDocumento] = useState("");
  const [tipo, setTipo] = useState<"cnpj" | "cpf">("cnpj");
  const [dtInicial, setDtInicial] = useState("");
  const [dtFinal, setDtFinal] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const urlBI = "https://app.powerbi.com/reportEmbed?reportId=44029358-a74c-43ff-b041-0a01877077e3&autoAuth=true&ctid=7b8228c2-911b-4b3d-bca2-bb42add6ec41";

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
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden", backgroundColor: "#000" }}>
      
      {/* SIDEBAR COM LARGURA FIXA E POSIÇÃO GARANTIDA */}
      <div style={{ 
        width: "250px", 
        minWidth: "250px", 
        height: "100vh", 
        backgroundColor: "#161b22", 
        borderRight: "1px solid #30363d", 
        display: "flex", 
        flexDirection: "column", 
        padding: "20px",
        boxSizing: "border-box",
        zIndex: 100 
      }}>
        <h2 style={{ fontSize: "1.2rem", color: "#58a6ff", margin: "0 0 20px 0", fontWeight: "600" }}>Filtros do BI</h2>

        {/* CAMPOS DE FILTRO */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label style={{ fontSize: "11px", color: "#8b949e", display: "block", marginBottom: "5px" }}>CNPJ / CPF</label>
            <input
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #30363d", backgroundColor: "#0d1117", color: "#fff", outline: "none", boxSizing: "border-box" }}
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              placeholder="Somente números"
            />
          </div>

          <div>
            <label style={{ fontSize: "11px", color: "#8b949e", display: "block", marginBottom: "5px" }}>Tipo</label>
            <select 
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #30363d", backgroundColor: "#0d1117", color: "#fff", cursor: "pointer" }}
              value={tipo} 
              onChange={(e) => setTipo(e.target.value as any)}
            >
              <option value="cnpj">CNPJ</option>
              <option value="cpf">CPF</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "10px", color: "#8b949e", display: "block", marginBottom: "5px" }}>Data Inicial</label>
              <input style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #30363d", backgroundColor: "#0d1117", color: "#fff", fontSize: "11px" }} type="date" value={dtInicial} onChange={(e) => setDtInicial(e.target.value)} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "10px", color: "#8b949e", display: "block", marginBottom: "5px" }}>Data Final</label>
              <input style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #30363d", backgroundColor: "#0d1117", color: "#fff", fontSize: "11px" }} type="date" value={dtFinal} onChange={(e) => setDtFinal(e.target.value)} />
            </div>
          </div>
        </div>

        {/* ÁREA DOS BOTÕES - SEPARADA NA BASE */}
        <div style={{ padding: "15px 0 0 0", borderTop: "1px solid #30363d", display: "flex", flexDirection: "column", gap: "12px" }}>
          <button 
            onClick={aplicarFiltro} 
            disabled={loading}
            style={{ padding: "12px", backgroundColor: "#1f6feb", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
          >
            {loading ? "Processando..." : "APLICAR FILTROS"}
          </button>

          <button 
            onClick={() => setRefreshKey(prev => prev + 1)}
            style={{ padding: "10px", backgroundColor: "transparent", color: "#58a6ff", border: "1px solid #58a6ff", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}
          >
            🔄 RECARREGAR RELATÓRIO
          </button>
          
          {msg && <p style={{ fontSize: "12px", textAlign: "center", color: msg.includes("✅") ? "#3fb950" : "#f85149", margin: "5px 0" }}>{msg}</p>}
        </div>
      </div>

      {/* ÁREA DO RELATÓRIO - PREENCHIMENTO TOTAL */}
      <div style={{ flex: 1, height: "100vh", position: "relative", backgroundColor: "#000" }}>
        <iframe
          key={refreshKey}
          title="Mercado Abilhão"
          src={urlBI}
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          allowFullScreen={true}
        ></iframe>
      </div>

    </div>
  );
};

export default Dashboard;
