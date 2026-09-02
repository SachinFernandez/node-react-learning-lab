export const getNodeInfo = (req, res) => {
  // process is a Node.js global object for the current runtime process.
  return res.status(200).json({
    success: true,
    data: {
      runtime: "Node.js",
      version: process.version,
      platform: process.platform,
      architecture: process.arch,
      processId: process.pid,
      uptime: process.uptime(),
    },
  });
};