"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Html, OrbitControls, RoundedBox, Sparkles, Text } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import type { AgentDefinition, AgentId, AgentStatus } from "@/lib/types";

type OfficeSceneProps = { agents: AgentDefinition[]; selectedAgent: AgentId; statuses: Record<AgentId, AgentStatus>; onSelect: (id: AgentId) => void };

function Desk({ position, color, selected, name, status, onClick }: { position: [number, number, number]; color: string; selected: boolean; name: string; status: AgentStatus; onClick: () => void }) {
  return <group position={position} onClick={(event) => { event.stopPropagation(); onClick(); }}>
    <RoundedBox args={[2.35, .16, 1.15]} radius={.12} smoothness={4} position={[0, 1.05, 0]} castShadow><meshStandardMaterial color="#141c2c" metalness={.65} roughness={.28}/></RoundedBox>
    {[-.9, .9].map((x) => <mesh key={x} position={[x, .48, 0]} castShadow><boxGeometry args={[.1, 1, .1]}/><meshStandardMaterial color="#344054" metalness={.6} roughness={.4}/></mesh>)}
    <RoundedBox args={[.82, .54, .06]} radius={.06} smoothness={3} position={[0, 1.42, -.25]} rotation={[-.08, 0, 0]}><meshStandardMaterial color="#08101f" emissive={color} emissiveIntensity={selected ? .55 : .16} metalness={.2} roughness={.22}/></RoundedBox>
    <mesh position={[0, 1.43, -.215]}><planeGeometry args={[.68, .4]}/><meshBasicMaterial color={color} transparent opacity={selected ? .8 : .32}/></mesh>
    <mesh position={[0, 1.35, .05]}><boxGeometry args={[.55, .025, .3]}/><meshStandardMaterial color="#080d18"/></mesh>
    <mesh position={[0, .08, 0]}><boxGeometry args={[1.9, .04, .9]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={selected ? .8 : .22} transparent opacity={selected ? .9 : .45}/></mesh>
    <group position={[0, 0, .98]}>
      <mesh position={[0, .55, 0]} castShadow><capsuleGeometry args={[.24, .45, 4, 8]}/><meshStandardMaterial color={color} metalness={.45} roughness={.35}/></mesh>
      <mesh position={[0, 1, 0]} castShadow><sphereGeometry args={[.25, 20, 16]}/><meshStandardMaterial color="#dce8ff" metalness={.25} roughness={.3}/></mesh>
      <mesh position={[0, 1.02, .22]}><sphereGeometry args={[.055, 12, 10]}/><meshBasicMaterial color={color}/></mesh>
      <mesh position={[-.1, 1.04, .21]}><sphereGeometry args={[.025, 10, 8]}/><meshBasicMaterial color="#0a1222"/></mesh>
      <mesh position={[.1, 1.04, .21]}><sphereGeometry args={[.025, 10, 8]}/><meshBasicMaterial color="#0a1222"/></mesh>
      <mesh position={[0, .32, -.12]}><boxGeometry args={[.72, .08, .38]}/><meshStandardMaterial color="#161e30"/></mesh>
    </group>
    <Html position={[0, 2, .95]} center distanceFactor={10} style={{ pointerEvents: "none", whiteSpace: "nowrap" }}>
      <div className={`scene-label ${selected ? "scene-label-active" : ""}`} style={{ "--agent-color": color } as React.CSSProperties}><span className={`scene-dot scene-dot-${status}`}/>{name}<small>{status.toUpperCase()}</small></div>
    </Html>
  </group>;
}
function OfficeFloor() {
  const lines = useMemo(() => { const values: React.ReactNode[] = []; for (let i=-8;i<=8;i++) { values.push(<mesh key={`x${i}`} position={[i,-.035,0]}><boxGeometry args={[.012,.01,18]}/><meshBasicMaterial color="#1b2e48" transparent opacity={.7}/></mesh>); values.push(<mesh key={`z${i}`} position={[0,-.035,i]}><boxGeometry args={[18,.01,.012]}/><meshBasicMaterial color="#1b2e48" transparent opacity={.7}/></mesh>); } return values; }, []);
  return <group><mesh receiveShadow position={[0,-.09,0]}><boxGeometry args={[18,.2,18]}/><meshStandardMaterial color="#0a1120" metalness={.25} roughness={.78}/></mesh>{lines}</group>;
}
function CenterCore() {
  return <group>
    <Float speed={1.3} rotationIntensity={.1} floatIntensity={.18}>
      <mesh position={[0,1.25,0]}><icosahedronGeometry args={[.62,1]}/><meshStandardMaterial color="#92eeff" emissive="#1bc7ff" emissiveIntensity={1.25} metalness={.45} roughness={.18} wireframe/></mesh>
      <mesh position={[0,1.25,0]}><sphereGeometry args={[.32,24,24]}/><meshBasicMaterial color="#d9fbff"/></mesh>
    </Float>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,.01,0]}><ringGeometry args={[.92,1.02,64]}/><meshBasicMaterial color="#52dcff" transparent opacity={.9}/></mesh>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,.015,0]}><ringGeometry args={[1.25,1.27,64]}/><meshBasicMaterial color="#9767ff" transparent opacity={.65}/></mesh>
    <Text position={[0,2.12,0]} fontSize={.25} color="#e7faff" anchorX="center" anchorY="middle" outlineWidth={.01} outlineColor="#08101f">NOVA / COMMAND</Text>
    <Text position={[0,.12,1.55]} fontSize={.13} color="#7fa8c9" anchorX="center" anchorY="middle">MISSION CORE</Text>
  </group>;
}
export default function OfficeScene({ agents, selectedAgent, statuses, onSelect }: OfficeSceneProps) {
  return <div className="office-canvas" aria-label="Interactive 3D AGENTVERSE headquarters">
    <Canvas shadows dpr={[1,1.7]} camera={{position:[10,10,13],fov:42}} gl={{antialias:true,alpha:true}}>
      <color attach="background" args={["#080d18"]}/><fog attach="fog" args={["#080d18",18,34]}/>
      <ambientLight intensity={.75}/><directionalLight position={[6,10,4]} intensity={2} castShadow shadow-mapSize={[1024,1024]}/>
      <pointLight position={[-5,5,-5]} color="#735bff" intensity={30} distance={20}/><pointLight position={[5,4,4]} color="#30cfff" intensity={24} distance={16}/>
      <Suspense fallback={null}><OfficeFloor/><CenterCore/>
        {agents.filter((agent)=>agent.id!=="commander").map((agent)=><Desk key={agent.id} position={agent.station} color={agent.color} selected={selectedAgent===agent.id} name={agent.name} status={statuses[agent.id]} onClick={()=>onSelect(agent.id)}/>)}
        <Sparkles count={90} scale={[17,4,17]} size={1.5} speed={.25} opacity={.55} color="#72dfff"/><ContactShadows position={[0,-.12,0]} opacity={.3} scale={18} blur={2.5} far={3}/><Environment preset="city"/>
      </Suspense>
      <OrbitControls makeDefault enableDamping dampingFactor={.06} minDistance={7} maxDistance={24} maxPolarAngle={Math.PI/2.05} target={[0,.7,0]}/>
    </Canvas>
    <div className="canvas-hint"><span className="live-indicator"/> LIVE WORKSPACE <span className="hint-separator">·</span> DRAG TO ORBIT <span className="hint-separator">·</span> SCROLL TO ZOOM</div>
    <div className="canvas-coordinates">AV / HQ-01<br/>40° 43&apos; 55.3&quot; N</div>
  </div>;
}
