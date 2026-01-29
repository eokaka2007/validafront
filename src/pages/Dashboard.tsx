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
    <div style={{ 
      display: "flex", height: "100vh", width: "100vw", overflow: "hidden", 
      backgroundColor: "#0d1117", color: "#fff", fontFamily: "'Segoe UI', system-ui, sans-serif" 
    }}>
      
      {/* SIDEBAR REFINADA */}
      <aside style={{ 
        width: "240px", minWidth: "240px", height: "100%", padding: "20px", 
        borderRight: "1px solid #30363d", display: "flex", flexDirection: "column", 
        backgroundColor: "#161b22", zIndex: 10
      }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: "600", color: "#58a6ff", marginBottom: "20px" }}>Filtros do BI</h2>

        {/* ÁREA DE INPUTS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
          <div style={{ marginBottom: "5px" }}>
            <label style={{ fontSize: "11px", color: "#8b949e", display: "block", marginBottom: "4px" }}>CNPJ / CPF</label>
            <input
              style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #30363d", backgroundColor: "#0d1117", color: "#fff", fontSize: "13px", outline: "none" }}
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              placeholder="00.000.000/0000-00"
            />
          </div>

          <div style={{ marginBottom: "5px" }}>
            <label style={{ fontSize: "11px", color: "#8b949e", display: "block", marginBottom: "4px" }}>Tipo</label>
            <select 
              style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #30363d", backgroundColor: "#0d1117", color: "#fff", fontSize: "13px", cursor: "pointer" }}
              value={tipo} 
              onChange={(e) => setTipo(e.target.value as any)}
            >
              <option value="cnpj">CNPJ</option>
              <option value="cpf">CPF</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "11px", color: "#8b949e", display: "block", marginBottom: "4px" }}>Inicial</label>
              <input style={{ width: "100%", padding: "7px", borderRadius: "6px", border: "1px solid #30363d", backgroundColor: "#0d1117", color: "#fff", fontSize: "11px" }} type="date" value={dtInicial} onChange={(e) => setDtInicial(e.target.value)} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "11px", color: "#8b949e", display: "block", marginBottom: "4px" }}>Final</label>
              <input style={{ width: "100%", padding: "7px", borderRadius: "6px", border: "1px solid #30363d", backgroundColor: "#0d1117", color: "#fff", fontSize: "11px" }} type="date" value={dtFinal} onChange={(e) => setDtFinal(e.target.value)} />
            </div>
          </div>
        </div>

        {/* RODAPÉ DA SIDEBAR COM BOTÕES AJUSTADOS */}
        <div style={{ borderTop: "1px solid #30363d", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <button 
            onClick={aplicarFiltro} 
            disabled={loading}
            style={{
              padding: "12px", backgroundColor: "#1f6feb", color: "#fff", border: "none", 
              borderRadius: "6px", fontWeight: "600", cursor: "pointer", fontSize: "13px",
              transition: "background 0.2s"
            }}
          >
            {loading ? "Processando..." : "APLICAR FILTROS"}
          </button>

          <button 
            onClick={() => setRefreshKey(prev => prev + 1)}
            style={{
              padding: "10px", backgroundColor: "transparent", color: "#58a6ff", 
              border: "1px solid #30363d", borderRadius: "6px", fontWeight: "600", 
              cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px"
            }}
          >
            🔄 Recarregar Relatório
          </button>
          
          {msg && <p style={{ fontSize: "12px", textAlign: "center", color: msg.includes("✅") ? "#3fb950" : "#f85149", marginTop: "5px" }}>{msg}</p>}
        </div>
      </aside>

      {/* ÁREA DO BI - FLUIDA */}
      <main style={{ flex: 1, backgroundColor: "#000", position: "relative" }}>
        <iframe
          key={refreshKey}
          title="Mercado Abilhão"
          src={urlBI}
          style={{ width: "100%", height: "100%", border: "none" }}
          allowFullScreen={true}
        ></iframe>
      </main>

    </div>
  );
};

export default Dashboard;
