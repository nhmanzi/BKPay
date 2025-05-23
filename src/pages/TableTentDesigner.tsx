import React, { useRef, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import * as THREE from 'three'

// Import portrait wave images
const PortraitWave1 = '/assets/portrait/Portrait_01.jpg';
const PortraitWave2 = '/assets/portrait/Portrait_02.jpg';
const PortraitWave3 = '/assets/portrait/Portrait_03.jpg';
const PortraitWave4 = '/assets/portrait/Portrait_04.jpg';

// Import landscape images
const LandscapeWave1 = '/assets/landscape/Landscape_01.jpg';
const LandscapeWave2 = '/assets/landscape/Landscape_02.jpg';
const LandscapeWave3 = '/assets/landscape/Landscape_03.jpg';
const LandscapeWave4 = '/assets/landscape/Landscape_04.jpg';

// Import circular images
const Circular1 = '/assets/circular/Circular_01.jpg';
const Circular2 = '/assets/circular/Circular_02.jpg';
const Circular3 = '/assets/circular/Circular_03.jpg';
const Circular4 = '/assets/circular/Circular_04.jpg';

interface ImageTemplate {
  name: string;
  image: string;
}

const portraitTemplates: ImageTemplate[] = [
  {
    name: 'Wave 1',
    image: PortraitWave1
  },
  {
    name: 'Wave 2',
    image: PortraitWave2
  },
  {
    name: 'Wave 3',
    image: PortraitWave3
  },
  {
    name: 'Wave 4',
    image: PortraitWave4
  }
];

const landscapeTemplates: ImageTemplate[] = [
  {
    name: 'Wave 1',
    image: LandscapeWave1
  },
  {
    name: 'Wave 2',
    image: LandscapeWave2
  },
  {
    name: 'Wave 3',
    image: LandscapeWave3
  },
  {
    name: 'Wave 4',
    image: LandscapeWave4
  }
];

const circularTemplates: ImageTemplate[] = [
  {
    name: 'Circle 1',
    image: Circular1
  },
  {
    name: 'Circle 2',
    image: Circular2
  },
  {
    name: 'Circle 3',
    image: Circular3
  },
  {
    name: 'Circle 4',
    image: Circular4
  }
];

const Tent3D = ({ gradientIndex, type }: { gradientIndex: number, type: string }) => {
  // Create a texture for the selected image
  const texture = useMemo(() => {
    let templates: ImageTemplate[];
    if (type === 'landscape') {
      templates = landscapeTemplates;
    } else if (type === 'circular' || type === 'circular-table-tent') {
      templates = circularTemplates;
    } else {
      templates = portraitTemplates;
    }
    const selectedTemplate = templates[gradientIndex];
    return new THREE.TextureLoader().load(selectedTemplate.image);
  }, [gradientIndex, type]);

  const commonMaterialProps = {
    map: texture,
    color: undefined
  };

  if (type === 'landscape') {
    // Single folded panel (like a paper tent)
    const tentWidth = 2.8;
    const tentHeight = 1.6;
    const tentDepth = 0.04; // thinner for paper look
    const tentAngle = Math.PI / 8; // ~22.5 degrees
    const padding = 0.12;
    return (
      <group>
        {/* Main tent panel, rotated to rest on table */}
        <group rotation={[tentAngle, 0, 0]} position={[0, tentHeight / 2 * Math.cos(tentAngle), 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[tentWidth, tentHeight, tentDepth]} />
            {/* Sides: white, front/back: design, top/bottom: gray */}
            <meshStandardMaterial attach="material-0" color="#fff" /> {/* right */}
            <meshStandardMaterial attach="material-1" color="#fff" /> {/* left */}
            <meshStandardMaterial attach="material-2" color="#e5e7eb" /> {/* top */}
            <meshStandardMaterial attach="material-3" color="#e5e7eb" /> {/* bottom */}
            <meshStandardMaterial attach="material-4" map={texture} /> {/* front */}
            <meshStandardMaterial attach="material-5" map={texture} /> {/* back */}
          </mesh>
          {/* Inset front face (design with padding) */}
          <mesh position={[0, 0, tentDepth / 2 + 0.001]}>
            <planeGeometry args={[tentWidth - 2 * padding, tentHeight - 2 * padding]} />
            <meshStandardMaterial map={texture} />
          </mesh>
          {/* Inset back face (design with padding) */}
          <mesh position={[0, 0, -tentDepth / 2 - 0.001]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[tentWidth - 2 * padding, tentHeight - 2 * padding]} />
            <meshStandardMaterial map={texture} />
          </mesh>
        </group>
        {/* Table and shadow removed */}
      </group>
    );
  }
  if (type === 'circular-table-tent' || type === 'circular') {
    // Coin-like: very thin, design on front and back, edge is solid color
    const coinRadius = 0.9;
    const coinThickness = 0.06;
    const padding = 0.08;
    return (
      <group>
        {/* Main coin body */}
        <mesh>
          <cylinderGeometry args={[coinRadius, coinRadius, coinThickness, 64]} />
          {/* Edge: white, faces: design */}
          <meshStandardMaterial attach="material-0" color="#fff" /> {/* side */}
          <meshStandardMaterial attach="material-1" map={texture} /> {/* top (head) */}
          <meshStandardMaterial attach="material-2" map={texture} /> {/* bottom (tail) */}
        </mesh>
        {/* Inset front face (design with padding) */}
        <mesh position={[0, coinThickness / 2 + 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[coinRadius - padding, 64]} />
          <meshStandardMaterial map={texture} />
        </mesh>
        {/* Inset back face (design with padding) */}
        <mesh position={[0, -coinThickness / 2 - 0.001, 0]} rotation={[-Math.PI / 2, Math.PI, 0]}>
          <circleGeometry args={[coinRadius - padding, 64]} />
          <meshStandardMaterial map={texture} />
        </mesh>
      </group>
    );
  }
  if (type === 'portrait') {
    return (
      <group>
        {/* Metal frame */}
        <mesh position={[0, 1.2, 0]} rotation={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 2.4, 32]} />
          <meshStandardMaterial metalness={1} roughness={0.3} color="#b0b0b0" />
        </mesh>
        <mesh position={[0.7, 0.6, 0]} rotation={[0, 0, Math.PI / 12]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.6, 32]} />
          <meshStandardMaterial metalness={1} roughness={0.3} color="#b0b0b0" />
        </mesh>
        <mesh position={[-0.7, 0.6, 0]} rotation={[0, 0, -Math.PI / 12]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.6, 32]} />
          <meshStandardMaterial metalness={1} roughness={0.3} color="#b0b0b0" />
        </mesh>
        {/* Top bar */}
        <mesh position={[0, 1.95, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.4, 32]} />
          <meshStandardMaterial metalness={1} roughness={0.3} color="#b0b0b0" />
        </mesh>
        {/* Hanging board (main body, dark sides) */}
        <mesh position={[0, 1.4, 0.03]} castShadow>
          <boxGeometry args={[0.9, 1.2, 0.06]} />
          <meshStandardMaterial color="#222" roughness={0.7} metalness={0.1} />
        </mesh>
        {/* Front face with image and padding */}
        <mesh position={[0, 1.4, 0.065]} castShadow>
          <planeGeometry args={[0.78, 1.08]} />
          <meshStandardMaterial map={texture ?? undefined} color={!texture ? '#444' : undefined} />
        </mesh>
        {/* Clips */}
        <mesh position={[-0.3, 1.75, 0.07]} castShadow>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.3, 1.75, 0.07]} castShadow>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    );
  }
  // Default: portrait
  return (
    <group>
      {/* Hanging string */}
      <mesh position={[0, 1.7, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 16]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <torusGeometry args={[0.06, 0.02, 16, 100]} />
        <meshStandardMaterial color="#bbb" />
      </mesh>
      {/* Tent */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.4, 2.4, 0.1]} />
        <meshStandardMaterial {...commonMaterialProps} />
      </mesh>
    </group>
  );
};

const TableTentDesigner = () => {
  const { templateType = 'portrait' } = useParams();
  const navigate = useNavigate();
  const [selectedGradient, setSelectedGradient] = useState(0);
  const svgRef = useRef<HTMLDivElement>(null);

  let templates: ImageTemplate[];
  if (templateType === 'landscape') {
    templates = landscapeTemplates;
  } else if (templateType === 'circular' || templateType === 'circular-table-tent') {
    templates = circularTemplates;
  } else {
    templates = portraitTemplates;
  }

  const handleDownloadPDF = async () => {
    if (!svgRef.current) return;
    const canvas = await html2canvas(svgRef.current, { backgroundColor: null });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: templateType === 'landscape' ? 'l' : 'p', unit: 'pt', format: [canvas.width, canvas.height] });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('table-tent-design.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-start py-8">
      <div className="w-full bg-white rounded-2xl p-8 flex flex-col items-center">
        <div className="w-full flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="text-primary-600 font-medium hover:underline">&larr; Back</button>
          <h2 className="text-2xl font-bold text-gray-900 text-center flex-1 capitalize">Customize Your {templateType.replace(/-/g, ' ')} Table Tent</h2>
          <div style={{ width: 80 }}></div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-12 items-center justify-center">
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div ref={svgRef} className="bg-gray-100 rounded-lg flex items-center justify-center p-8">
              <Canvas shadows camera={{ position: [0, 1, 4], fov: 40 }} style={{ width: 400, height: 400, background: '#f3f4f6', borderRadius: 16 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[2, 4, 2]} intensity={1.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
                <spotLight position={[-2, 6, 2]} angle={0.3} penumbra={0.5} intensity={0.5} castShadow />
                <Stage environment={undefined} intensity={0.5} shadows={false}>
                  <Tent3D gradientIndex={selectedGradient} type={templateType} />
                </Stage>
                <OrbitControls enablePan={false} />
              </Canvas>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4 items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1">Choose a design</label>
            <div className="flex gap-4">
              {templates.map((t, idx) => (
                <button
                  key={t.name}
                  className={`${templateType === 'circular' || templateType === 'circular-table-tent' ? 'rounded-full' : 'rounded-lg'} p-1 border-2 ${selectedGradient === idx ? 'border-primary-500' : 'border-transparent'} transition bg-white`}
                  onClick={() => setSelectedGradient(idx)}
                  style={{
                    width: templateType === 'landscape' ? 144 : (templateType === 'circular' || templateType === 'circular-table-tent' ? 96 : 96),
                    height: templateType === 'landscape' ? 96 : (templateType === 'circular' || templateType === 'circular-table-tent' ? 96 : 144),
                    background: `url(${t.image}) center/cover no-repeat`,
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)'
                  }}
                  aria-label={t.name}
                >
                  <span className="sr-only">{t.name}</span>
                </button>
              ))}
            </div>
            <button
              className="btn btn-primary mt-4 w-full"
              onClick={handleDownloadPDF}
              disabled={!selectedGradient}
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableTentDesigner; 