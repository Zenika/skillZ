FROM rust:1.43 as builder

WORKDIR /tmp
RUN USER=root cargo new --bin builder
WORKDIR /tmp/builder
COPY ./Cargo.lock .
COPY ./Cargo.toml .
COPY src src
RUN cargo build --release

FROM debian:stretch-slim
WORKDIR /app
RUN apt-get update -y && apt-get install -y libpq-dev openssl libssl1.0-dev ca-certificates
COPY --from=builder /tmp/builder/target/release/api /app

CMD ["/app/api"]
