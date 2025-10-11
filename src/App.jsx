import { useState, useEffect } from "react";
import { Trash2, Plus, StickyNote, Download, Sparkles, X } from "lucide-react";

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  // Check if app is already installed and handle install prompt
  useEffect(() => {
    // Check if app is running in standalone mode (already installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    setIsInstalled(isStandalone);

    // Check if user has dismissed install banner before
    const hasDismissedInstall = localStorage.getItem('installBannerDismissed');

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);

      // Show banner if not dismissed and not installed
      if (!hasDismissedInstall && !isStandalone) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Show banner after delay if not installed and not dismissed
    if (!hasDismissedInstall && !isStandalone) {
      const timer = setTimeout(() => {
        setShowInstallBanner(true);
      }, 3000); // Show after 3 seconds

      return () => {
        window.removeEventListener("beforeinstallprompt", handler);
        clearTimeout(timer);
      };
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const addNote = () => {
    if (input.trim() === "") return;
    setNotes([...notes, { id: Date.now(), text: input, createdAt: new Date() }]);
    setInput("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addNote();
    }
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      console.log("✅ User installed the app");
      setIsInstalled(true);
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
    setShowInstallButton(false);
    setShowInstallBanner(false);
  };

  const dismissInstallBanner = () => {
    setShowInstallBanner(false);
    // localStorage.setItem('installBannerDismissed', 'true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-4 sm:p-8">
      {/* Install Banner */}
      {showInstallBanner && !isInstalled && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20 max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-fuchsia-500 p-2 rounded-lg flex-shrink-0">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800 mb-1">Install MindNotes</h3>
                <p className="text-gray-600 text-sm mb-3">Get quick access to your notes right from your home screen!</p>
                <div className="flex gap-2">
                  <button
                    onClick={handleInstall}
                    className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Install Now
                  </button>
                  <button
                    onClick={dismissInstallBanner}
                    className="text-gray-400 hover:text-gray-600 px-3 py-2 rounded-lg text-sm transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
              <button
                onClick={dismissInstallBanner}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="text-center mb-8 animate-fade-in relative">
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-xl rounded-3xl px-8 py-5 shadow-2xl border-2 border-white/20 relative overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-fuchsia-400/10 to-purple-400/10 animate-shimmer"></div>

            <div className="relative flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-fuchsia-500 p-2 rounded-xl shadow-lg">
                <StickyNote className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent tracking-tight flex items-center gap-2">
                  MindNotes
                  <Sparkles className="w-6 h-6 text-fuchsia-500 animate-pulse" />
                </h1>
                <p className="text-purple-600/70 text-xs font-medium tracking-wide">CAPTURE • ORGANIZE • REMEMBER</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mt-4">
            <p className="text-white/90 text-sm font-medium drop-shadow-lg">Your thoughts, beautifully organized ✨</p>
            {showInstallButton && (
              <button
                onClick={handleInstall}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 border border-white/30"
              >
                <Download className="w-4 h-4" />
                Install Now
              </button>
            )}
          </div>
        </header>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8">
          {/* Input Section */}
          <div className="mb-6">
            <div className="flex gap-2">
              <input
                className="flex-grow bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all text-gray-800 placeholder-gray-400"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What's on your mind?"
              />
              <button
                onClick={addNote}
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Add</span>
              </button>
            </div>
          </div>

          {/* Notes List */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {notes.length === 0 && (
              <div className="text-center py-12">
                <StickyNote className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 text-lg">No notes yet</p>
                <p className="text-gray-300 text-sm mt-1">Start by adding your first note above</p>
              </div>
            )}
            {notes.map((note) => (
              <div
                key={note.id}
                className="group bg-gradient-to-r from-purple-50 to-fuchsia-50 hover:from-purple-100 hover:to-fuchsia-100 rounded-xl p-4 transition-all hover:shadow-md border-2 border-transparent hover:border-purple-200"
              >
                <div className="flex justify-between items-start gap-3">
                  <p className="text-gray-800 flex-grow leading-relaxed">{note.text}</p>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                    title="Delete note"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Notes Counter */}
          {notes.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-center text-gray-500 text-sm">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'} saved
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-6 text-white/60 text-xs">
          <p>Your notes are stored in memory during this session</p>
        </footer>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c084fc;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a855f7;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        .animate-slide-down {
          animation: slideDown 0.5s ease-out;
        }
        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translateY(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </div>
  );
}

export default App;