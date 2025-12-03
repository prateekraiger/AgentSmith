import React from 'react'
import AgentSetttings from '../_nodeSettings/AgentSettings';

function NodeSettings({selectedNode}:any) {
  return (
    <div>
        {selectedNode?.type==='agentNode'?
        <AgentSetttings selectedNode={selectedNode}/>:null}
    </div>
  )
}

export default NodeSettings
