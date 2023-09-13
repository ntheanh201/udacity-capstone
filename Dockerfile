FROM golang:1.19

WORKDIR /app
COPY src/go.mod ./
ENV CGO_ENABLED=0
RUN go mod download
COPY src/*.go ./
RUN GOOS=linux go build -o /go-capstone

CMD ["/go-capstone"]