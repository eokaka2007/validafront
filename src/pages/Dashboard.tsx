import { useState } from "react";

const Dashboard = () => {
  const [documento, setDocumento] = useState("");
  const [tipo, setTipo] = useState<"cnpj" | "cpf">("cnpj");
  const [dtInicial, setDtInicial] = useState("");
  const [dtFinal, setDtFinal] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

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
      setMsg("✅ Filtros aplicados! Atualize o BI.");
    } catch (err: any) {
      setMsg("❌ Erro: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden", backgroundColor: "#1e1e1e", color: "#fff" }}>
      
      {/* SIDEBAR DE FILTROS (ESTILO ANTIGO) */}
      <div style={{ 
        width: "320px", 
        minWidth: "320px",
        padding: "30px", 
        borderRight: "1px solid #333", 
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        boxShadow: "2px 0 10px rgba(0,0,0,0.5)"
      }}>
        <h2 style={{ fontSize: "20px", margin: "0 0 10px 0" }}>Filtros do BI</h2>

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>CNPJ / CPF</label>
          <input
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#2d2d2d", color: "#fff" }}
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            placeholder="Somente números"
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Tipo</label>
          <select 
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#2d2d2d", color: "#fff" }}
            value={tipo} 
            onChange={(e) => setTipo(e.target.value as any)}
          >
            <option value="cnpj">CNPJ</option>
            <option value="cpf">CPF</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Data inicial</label>
          <input 
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#2d2d2d", color: "#fff" }}
            type="date" value={dtInicial} onChange={(e) => setDtInicial(e.target.value)} 
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Data final</label>
          <input 
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#2d2d2d", color: "#fff" }}
            type="date" value={dtFinal} onChange={(e) => setDtFinal(e.target.value)} 
          />
        </div>

        <button 
          onClick={aplicarFiltro} 
          disabled={loading}
          style={{
            padding: "15px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s"
          }}
        >
          {loading ? "PROCESSANDO..." : "APLICAR FILTROS"}
        </button>

        {msg && <p style={{ fontSize: "13px", color: msg.includes("✅") ? "#4caf50" : "#ff5252" }}>{msg}</p>}
      </div>

      {/* ÁREA DO POWER BI (OCUPA O RESTO) */}
      <div style={{ flex: 1, overflow: "auto", position: "relative", backgroundColor: "#000" }}>
        <iframe
          title="Mercado Abilhão"
          src={urlBI}
          style={{ 
            width: "3940px", // Tamanho real da sua imagem
            height: "2300px", // Tamanho real da sua imagem
            border: "none",
            transformOrigin: "0 0",
            // Opcional: use zoom para caber na tela se não quiser scroll
            // zoom: "0.4" 
          }}
          allowFullScreen={true}
        ></iframe>
      </div>

    </div>
  );
};

export default Dashboard;
