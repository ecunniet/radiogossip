import { useRef, useState } from "react";
import { supabase } from "./lib/supabaseClient";

export default function Recorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Démarrer l'enregistrement
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        await uploadToSupabase(blob);
      };

      mediaRecorder.start();
      setRecording(true);
      console.log("Recording started");
    } catch (err) {
      console.error("Micro non accessible :", err);
      alert("Micro non accessible : veuillez vérifier les permissions.");
    }
  };

  // Arrêter l'enregistrement
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    console.log("Recording stopped");
  };

  // Upload vers Supabase Storage
  const uploadToSupabase = async (blob: Blob) => {
    const fileName = `recording_${Date.now()}.wav`;

    console.log({ fileName });

    const { data, error } = await supabase.storage
      .from("audio")
      .upload(fileName, blob, { contentType: "audio/wav" });

    if (error) {
      console.error("Erreur d'upload :", error);
      alert("Erreur pendant l'upload ! Contactez Elise.");
      return;
    }

    // Récupérer l'URL publique
    const { data: publicUrlData } = supabase.storage
      .from("audio")
      .getPublicUrl(fileName);

    setAudioURL(publicUrlData.publicUrl);
    console.log("Upload terminé :", publicUrlData.publicUrl);
  };

  return (
    <div className="App">
      <h2>🎤 Enregistreur audio avec MediaRecorder</h2>
      <button onClick={startRecording} disabled={recording}>
        ▶️ Start
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        ⏹️ Stop
      </button>

      {audioURL && (
        <div>
          <p>✅ Fichier enregistré :</p>
          <audio controls src={audioURL}></audio>
          <p className="text-sm break-all">{audioURL}</p>
        </div>
      )}
    </div>
  );
}
