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
      backgroundColor: "#0d1117", color: "#fff", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" 
    }}>
      
      {/* SIDEBAR COMPACTA */}
      <aside style={{ 
        width: "260px", minWidth: "260px", height: "100%", padding: "18px", 
        borderRight: "1px solid #30363d", display: "flex", flexDirection: "column", 
        gap: "14px", backgroundColor: "#161b22", zIndex: 10
      }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#58a6ff", marginBottom: "5px" }}>Filtros do BI</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <label style={{ fontSize: "11px", color: "#8b949e", display: "block", marginBottom: "4px" }}>CNPJ / CPF</label>
            <input
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #30363d", backgroundColor: "#0d1117", color: "#fff", fontSize: "13px" }}
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              placeholder="00.000.000/0000-00"
            />
          </div>

          <div>
            <label style={{ fontSize: "11px", color: "#8b949e", display: "block", marginBottom: "4px" }}>Tipo</label>
            <select 
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #30363d", backgroundColor: "#0d1117", color: "#fff", fontSize: "13px" }}
              value={tipo} 
              onChange={(e) => setTipo(e.target.value as any)}
            >
              <option value="cnpj">CNPJ</option>
              <option value="cpf">CPF</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: "11px", color: "#8b949e", display: "block", marginBottom: "4px" }}>Data Inicial</label>
            <input style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #30363d", backgroundColor: "#0d1117", color: "#fff", fontSize: "12px" }} type="date" value={dtInicial} onChange={(e) => setDtInicial(e.target.value)} />
          </div>

          <div>
            <label style={{ fontSize: "11px", color: "#8b949e", display: "block", marginBottom: "4px" }}>Data Final</label>
            <input style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #30363d", backgroundColor: "#0d1117", color: "#fff", fontSize: "12px" }} type="date" value={dtFinal} onChange={(e) => setDtFinal(e.target.value)} />
          </div>
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
          <button 
            onClick={aplicarFiltro} 
            disabled={loading}
            style={{
              padding: "10px", backgroundColor: "#1f6feb", color: "#fff", border: "none", 
              borderRadius: "6px", fontWeight: "600", cursor: "pointer", fontSize: "13px"
            }}
          >
            {loading ? "Processando..." : "APLICAR FILTROS"}
          </button>

          <button 
            onClick={() => setRefreshKey(prev => prev + 1)}
            style={{
              padding: "8px", backgroundColor: "transparent", color: "#58a6ff", 
              border: "1px solid #58a6ff", borderRadius: "6px", fontWeight: "600", 
              cursor: "pointer", fontSize: "12px"
            }}
          >
            🔄 RECARREGAR RELATÓRIO
          </button>
          
          {msg && <p style={{ fontSize: "12px", textAlign: "center", color: msg.includes("✅") ? "#3fb950" : "#f85149", margin: "5px 0" }}>{msg}</p>}
        </div>
      </aside>

      {/* ÁREA DO BI - Fundo combinando com o relatório */}
      <main style={{ 
        flex: 1, 
        backgroundColor: "#0b2c3d", // Azul escuro combinando com o topo do seu BI
        height: "100%",
        display: "flex"
      }}>
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
