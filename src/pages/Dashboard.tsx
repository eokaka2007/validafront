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
      display: "flex", 
      height: "100vh", 
      width: "100vw", 
      overflow: "hidden", 
      backgroundColor: "#1e1e1e", 
      color: "#fff", 
      fontFamily: "sans-serif" 
    }}>
      
      {/* SIDEBAR - Largura fixa e scroll interno se necessário */}
      <aside style={{ 
        width: "320px", 
        minWidth: "320px", 
        height: "100%",
        padding: "25px", 
        borderRight: "1px solid #333", 
        display: "flex", 
        flexDirection: "column", 
        gap: "20px", 
        boxShadow: "10px 0 15px rgba(0,0,0,0.3)",
        zIndex: 10,
        overflowY: "auto"
      }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: "bold", marginBottom: "10px", color: "#007bff" }}>Filtros do BI</h2>

        <div>
          <label style={{ fontSize: "12px", color: "#aaa", display: "block", marginBottom: "8px" }}>CNPJ / CPF</label>
          <input
            style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#2d2d2d", color: "#fff", outline: "none" }}
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            placeholder="Somente números"
          />
        </div>

        <div>
          <label style={{ fontSize: "12px", color: "#aaa", display: "block", marginBottom: "8px" }}>Tipo</label>
          <select 
            style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#2d2d2d", color: "#fff" }}
            value={tipo} 
            onChange={(e) => setTipo(e.target.value as any)}
          >
            <option value="cnpj">CNPJ</option>
            <option value="cpf">CPF</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label style={{ fontSize: "12px", color: "#aaa", display: "block", marginBottom: "5px" }}>Data Inicial</label>
            <input style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#2d2d2d", color: "#fff" }} type="date" value={dtInicial} onChange={(e) => setDtInicial(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: "12px", color: "#aaa", display: "block", marginBottom: "5px" }}>Data Final</label>
            <input style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#2d2d2d", color: "#fff" }} type="date" value={dtFinal} onChange={(e) => setDtFinal(e.target.value)} />
          </div>
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
          <button 
            onClick={aplicarFiltro} 
            disabled={loading}
            style={{
              padding: "15px", backgroundColor: "#007bff", color: "#fff", border: "none", 
              borderRadius: "6px", fontWeight: "bold", cursor: "pointer", transition: "0.2s",
            }}
          >
            {loading ? "Processando..." : "APLICAR FILTROS"}
          </button>

          <button 
            onClick={() => setRefreshKey(prev => prev + 1)}
            style={{
              padding: "12px", backgroundColor: "transparent", color: "#007bff", 
              border: "2px solid #007bff", borderRadius: "6px", fontWeight: "bold", 
              cursor: "pointer"
            }}
          >
            🔄 RECARREGAR RELATÓRIO
          </button>
          
          {msg && <p style={{ fontSize: "13px", textAlign: "center", color: msg.includes("✅") ? "#4caf50" : "#ff5252", margin: "10px 0 0 0" }}>{msg}</p>}
        </div>
      </aside>

      {/* ÁREA DO BI - Ocupa todo o espaço restante */}
      <main style={{ 
        flex: 1, 
        backgroundColor: "#000", 
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}>
        <iframe
          key={refreshKey}
          title="Mercado Abilhão"
          src={urlBI}
          style={{ 
            width: "100%", 
            height: "100%", 
            border: "none" 
          }}
          allowFullScreen={true}
        ></iframe>
      </main>

    </div>
  );
};

export default Dashboard;
