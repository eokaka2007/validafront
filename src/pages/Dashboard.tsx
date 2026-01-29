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
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden", backgroundColor: "#1e1e1e", color: "#fff", fontFamily: "sans-serif" }}>
      
      {/* SIDEBAR */}
      <div style={{ 
        width: "300px", minWidth: "300px", padding: "20px", borderRight: "1px solid #333", 
        display: "flex", flexDirection: "column", gap: "20px", boxShadow: "4px 0 10px rgba(0,0,0,0.5)", zIndex: 10 
      }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: "bold", marginBottom: "10px" }}>Filtros do BI</h2>

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

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "12px", color: "#aaa" }}>Data Inicial</label>
            <input style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#2d2d2d", color: "#fff" }} type="date" value={dtInicial} onChange={(e) => setDtInicial(e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "12px", color: "#aaa" }}>Data Final</label>
            <input style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#2d2d2d", color: "#fff" }} type="date" value={dtFinal} onChange={(e) => setDtFinal(e.target.value)} />
          </div>
        </div>

        {/* BOTÃO PRINCIPAL */}
        <button 
          onClick={aplicarFiltro} 
          disabled={loading}
          style={{
            padding: "15px", backgroundColor: "#007bff", color: "#fff", border: "none", 
            borderRadius: "6px", fontWeight: "bold", cursor: "pointer", transition: "0.3s",
            boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)"
          }}
        >
          {loading ? "Processando..." : "APLICAR FILTROS"}
        </button>

        {/* BOTÃO DE RECARREGAR ESTILIZADO */}
        <button 
          onClick={() => setRefreshKey(prev => prev + 1)}
          style={{
            padding: "12px", backgroundColor: "transparent", color: "#007bff", 
            border: "2px solid #007bff", borderRadius: "6px", fontWeight: "bold", 
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
          }}
        >
          🔄 RECARREGAR RELATÓRIO
        </button>

        {msg && <p style={{ fontSize: "14px", fontWeight: "500", textAlign: "center", color: msg.includes("✅") ? "#4caf50" : "#ff5252" }}>{msg}</p>}
      </div>

      {/* ÁREA DO BI */}
      <div style={{ flex: 1, backgroundColor: "#000", position: "relative" }}>
        <iframe
          key={refreshKey}
          title="Mercado Abilhão"
          src={urlBI}
          style={{ width: "100%", height: "100%", border: "none" }}
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  );
};

export default Dashboard;
