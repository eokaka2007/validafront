import { useState } from "react";

const Dashboard = () => {
  const [documento, setDocumento] = useState("");
  const [tipo, setTipo] = useState<"cnpj" | "cpf">("cnpj");
  const [dtInicial, setDtInicial] = useState("");
  const [dtFinal, setDtFinal] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Sua URL do Power BI - Mantendo os parâmetros de autenticação
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

      if (!response.ok) throw new Error("Erro ao salvar filtros");

      setMsg("✅ Filtros salvos! Agora, clique em 'Atualizar' na barra superior do BI.");
    } catch (err: any) {
      setMsg("❌ Erro: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden", backgroundColor: "#1e1e1e" }}>
      
      {/* SIDEBAR DE FILTROS - Estilo Escuro conforme suas imagens */}
      <div style={{ 
        width: "300px", 
        minWidth: "300px",
        padding: "25px", 
        borderRight: "1px solid #333", 
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        color: "#fff"
      }}>
        <h2 style={{ fontSize: "1.2rem", margin: "0 0 10px 0" }}>Filtros do BI</h2>

        <div>
          <label style={{ fontSize: "12px", display: "block", marginBottom: "5px" }}>CNPJ / CPF</label>
          <input
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#2d2d2d", color: "#fff" }}
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            placeholder="Somente números"
          />
        </div>

        <div>
          <label style={{ fontSize: "12px", display: "block", marginBottom: "5px" }}>Tipo</label>
          <select 
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#2d2d2d", color: "#fff" }}
            value={tipo} 
            onChange={(e) => setTipo(e.target.value as any)}
          >
            <option value="cnpj">CNPJ</option>
            <option value="cpf">CPF</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "12px" }}>Inicial</label>
            <input style={{ width: "100%", padding: "8px", backgroundColor: "#2d2d2d", color: "#fff", border: "1px solid #444" }} type="date" value={dtInicial} onChange={(e) => setDtInicial(e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "12px" }}>Final</label>
            <input style={{ width: "100%", padding: "8px", backgroundColor: "#2d2d2d", color: "#fff", border: "1px solid #444" }} type="date" value={dtFinal} onChange={(e) => setDtFinal(e.target.value)} />
          </div>
        </div>

        <button 
          onClick={aplicarFiltro} 
          disabled={loading}
          style={{ padding: "12px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}
        >
          {loading ? "Processando..." : "APLICAR FILTROS"}
        </button>

        {msg && <p style={{ fontSize: "13px", color: msg.includes("✅") ? "#4caf50" : "#ff5252" }}>{msg}</p>}
      </div>

      {/* ÁREA DO POWER BI - Garantindo que a barra superior apareça */}
      <div style={{ flex: 1, backgroundColor: "#fff" }}>
        <iframe
          title="Mercado Abilhão"
          src={urlBI}
          style={{ 
            width: "100%", 
            height: "100%", 
            border: "none"
          }}
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  );
};

export default Dashboard;
