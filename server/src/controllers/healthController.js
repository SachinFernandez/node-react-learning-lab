export const getHealth = (req, res) => {
  return res.status(200).json({
    success: true,
    status: "UP",
    message: "Node.js Learning Lab backend is running",
  });
};