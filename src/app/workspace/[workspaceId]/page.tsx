interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  };
}

export default function WorkspaceIdPage({ params }: WorkspaceIdPageProps) {
  return (
    <div>
      <div>ID: {params.workspaceId}</div>
    </div>
  );
}
