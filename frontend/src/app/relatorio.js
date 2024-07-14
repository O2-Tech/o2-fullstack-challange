"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Relatorio() {
  const [valorTotalEstoque, setValorTotalEstoque] = React.useState(0);
  const [qantidadeItensEstoque, setQuantidadeItensEstoque] = React.useState(0);
  const [quantidadeTotalEntradas, setQuantidadeTotalEntradas] =
    React.useState(0);
  const [quantidadeTotalSaidas, setQuantidadeTotalSaidas] = React.useState(0);

  React.useEffect(() => {
    buscaDadosRelatorio();
  }, []);

  function buscaDadosRelatorio() {
    fetch("http://localhost:3000/api/produtos")
      .then((res) => res.json())
      .then((data) => {
        let valor = 0;
        let quantidade = 0;
        data.forEach((element) => {
          valor += element.quantidadeDisponivel * element.precoUnitario;
          quantidade += element.quantidadeDisponivel;
        });
        valor = valor.toString().replace(".", ",");
        setValorTotalEstoque(valor);
        setQuantidadeItensEstoque(quantidade);
      });

    fetch("http://localhost:3000/api/movimentacaoEstoque")
      .then((res) => res.json())
      .then((data) => {
        let quantidadeEntrada = 0;
        let quantidadeSaida = 0;
        data.forEach((element) => {
          if (element.tipoMovimentacao == "ENTRADA") {
            quantidadeEntrada += element.quantidade;
          } else {
            quantidadeSaida += element.quantidade;
          }
        });
        setQuantidadeTotalEntradas(quantidadeEntrada);
        setQuantidadeTotalSaidas(quantidadeSaida);
      });
  }

  return (
    <Box>
      <Stack
        spacing={2}
        direction="row"
        justifyContent={"flex-end"}
        sx={{ marginBottom: 3 }}
      >
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={() => buscaDadosRelatorio()}
        >
          PESQUISAR
        </Button>
      </Stack>
      <Box display={"flex"} spacing={2} direction="row">
        <Card sx={{ width: "25%", minHeight: 200, margin: 1 }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100%",
            }}
          >
            <Typography variant="h6" component="div">
              Valor total estoque:
            </Typography>
            <Typography variant="h4" padding={1} component="div">
              R${valorTotalEstoque}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: "25%", minHeight: 200, margin: 1 }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100%",
            }}
          >
            <Typography variant="h6" component="div">
              Quantidade de itens em estoque:
            </Typography>
            <Typography variant="h4" padding={1} component="div">
              {qantidadeItensEstoque}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: "25%", minHeight: 200, margin: 1 }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100%",
            }}
          >
            <Typography variant="h6" component="div">
              Quantidade total de entradas:
            </Typography>
            <Typography variant="h4" padding={1} component="div">
              {quantidadeTotalEntradas}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: "25%", minHeight: 200, margin: 1 }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100%",
            }}
          >
            <Typography variant="h6" component="div">
              Quantidade total de saídas:
            </Typography>
            <Typography variant="h4" padding={1} component="div">
              {quantidadeTotalSaidas}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
