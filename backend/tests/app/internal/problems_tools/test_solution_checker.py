import pytest

from backend.app.internal.problems_tools.check_solution import \
    compare_solutions, parse_expr, convert_expr_to_str
from sympy import symbols, sin, cos, pi, sqrt

x, y, z, w = symbols('x, y, z, w')


@pytest.mark.parametrize("expr1, expr2",
                         [
                             (x ** 2 + 2 * x * y + y ** 2, (x + y) ** 2),
                             (sin(x + y), sin(x) * cos(y) + cos(x) * sin(y)),
                             (sin(x + pi) / w, -sin(x) / w),
                             (2.312 * x, 2312 / 1000 * x),
                             ((x + y + z + w) ** 3,
                              w ** 3 + 3 * w ** 2 * x + 3 * w ** 2 * y +
                              3 * w ** 2 * z + 3 * w * x ** 2 +
                              6 * w * x * y + 6 * w * x * z +
                              3 * w * y ** 2 + 6 * w * y * z +
                              3 * w * z ** 2 + x ** 3 +
                              3 * x ** 2 * y + 3 * x ** 2 * z +
                              3 * x * y ** 2 + 6 * x * y * z +
                              3 * x * z ** 2 + y ** 3 + 3 * y ** 2 * z +
                              3 * y * z ** 2 + z ** 3)
                         ]
                         )
def test_compare_solution_ok(expr1, expr2):
    assert compare_solutions(expr1, expr2)


@pytest.mark.parametrize("expr1, expr2",
                         [
                             (x ** 2, (x + y) ** 2),
                             (23, 21),
                             (z, x),
                             (5, z),
                             (1.3, z)
                         ]
                         )
def test_compare_solution_not_equal(expr1, expr2):
    assert not compare_solutions(expr1, expr2)


@pytest.mark.parametrize("expr_str, correct_expression",
                         [
                             ("x**2", x ** 2),
                             (r"x**y", x ** y),
                             (r"\frac {1 + \sqrt {\x}} {\y}",
                              (sqrt(x) + 1) / y),
                             ("\\frac{\\cos{1 + \\sqrt {x} }} {y}",
                              cos(sqrt(x) + 1) / y),
                             (r"\frac {w z x} {y}",
                              (z * x * w) / y),
                         ]
                         )
def test_parse_solution(expr_str, correct_expression):
    expression = parse_expr(expr_str)
    assert compare_solutions(expression, correct_expression)


@pytest.mark.parametrize("str_expression, expression",
                         [
                             ("x**2", x ** 2),
                             ("x**y", x ** y),
                             ("(sqrt(x) + 1)/y",
                              (sqrt(x) + 1) / y),
                             ("cos(sqrt(x) + 1)/y",
                              cos(sqrt(x) + 1) / y),
                             ("w*x*z/y",
                              (z * x * w) / y),
                         ])
def test_convert_expr_to_str(str_expression, expression):
    str_converted = convert_expr_to_str(expression)
    assert str_converted == str_expression
