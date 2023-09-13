FROM golang:1.19

WORKDIR /app
COPY src/go.mod ./
RUN go mod download
COPY src/*.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /go-capstone

CMD ["/go-capstone"]