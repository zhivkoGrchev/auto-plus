import { AuthTool } from './auth-tool'
import { LocaleTool } from './locale-tool'
import { ThemeTool } from './theme-tool'

export const ToolBar = () => (
  <div className="flex space-x-4">
    <AuthTool />
    <LocaleTool />
    <ThemeTool />
  </div>
)
