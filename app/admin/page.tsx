import { isAdminAuthenticated, loginAdmin, getTodasInscricoes } from "./actions";
import AdminDashboard from "./AdminDashboard";
import styles from "./page.module.css";

type SearchParams = Promise<{ erro?: string }>;

export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  const { erro } = await searchParams;
  const autenticado = await isAdminAuthenticated();

  if (!autenticado) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <span className={styles.loginEyebrow}>CRC O Abelha</span>
            <h1>Área de Admin</h1>
            <p>Acesso restrito a administradores.</p>
          </div>
          <form action={loginAdmin} className={styles.loginForm}>
            <label className={styles.loginLabel}>Palavra-passe</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              autoFocus
              required
              className={styles.loginInput}
            />
            {erro && (
              <p className={styles.loginErro}>Palavra-passe incorreta.</p>
            )}
            <button type="submit" className={styles.loginBtn}>
              Entrar →
            </button>
          </form>
        </div>
      </div>
    );
  }

  const inscricoes = await getTodasInscricoes();

  return <AdminDashboard inscricoes={inscricoes} />;
}
