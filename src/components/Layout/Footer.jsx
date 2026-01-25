const Footer = () => {
  return (
    <footer className="glass-dark border-t golden-border py-4">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm mb-2 md:mb-0">
            <span className="text-gold-300">© 2026 ProjectPro</span> Project Management System. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-slate-400 hover:text-gold-300 transition-colors">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="text-slate-400 hover:text-gold-300 transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-slate-400 hover:text-gold-300 transition-colors">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer